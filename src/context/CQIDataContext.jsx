import { createContext, useState, useEffect, useCallback } from 'react';
import {
  mockCorrectiveActions,
  mockTimelineEvents,
  defaultNotificationPreference,
} from '../data/mockCQIData';

const CQIDataContext = createContext({
  correctiveActions: [],
  timelineEvents: [],
  notificationPreference: {},
  selectedDept: 'ALL',
  searchQuery: '',
  setSelectedDept: () => {},
  setSearchQuery: () => {},
  createCorrectiveAction: () => {},
  updateCorrectiveAction: () => {},
  deleteCorrectiveAction: () => {},
  transitionActionStatus: () => {},
  addTimelineEvent: () => {},
  updateNotificationPreferences: () => {},
});

const DATA_STORAGE_KEY = 'cqi-tracker-data';

export const CQIDataProvider = ({ children }) => {
  const [correctiveActions, setCorrectiveActions] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [notificationPreference, setNotificationPreference] = useState({});
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Seed
  useEffect(() => {
    const raw = window.localStorage.getItem(DATA_STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setCorrectiveActions(parsed.correctiveActions || []);
        setTimelineEvents(parsed.timelineEvents || []);
        setNotificationPreference(parsed.notificationPreference || defaultNotificationPreference);
      } catch (e) {
        console.error('Error loading localStorage data', e);
        seedDefaultData();
      }
    } else {
      seedDefaultData();
    }
  }, []);

  const seedDefaultData = () => {
    setCorrectiveActions(mockCorrectiveActions);
    setTimelineEvents(mockTimelineEvents);
    setNotificationPreference(defaultNotificationPreference);
    saveDataToStorage(mockCorrectiveActions, mockTimelineEvents, defaultNotificationPreference);
  };

  const saveDataToStorage = (actions, events, prefs) => {
    const payload = {
      correctiveActions: actions,
      timelineEvents: events,
      notificationPreference: prefs,
    };
    window.localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(payload));
  };

  const createCorrectiveAction = useCallback((newAction) => {
    setCorrectiveActions((prevActions) => {
      const generatedAction = {
        ...newAction,
        id: `CA-${new Date().getFullYear()}-${String(prevActions.length + 1).padStart(2, '0')}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      const updated = [generatedAction, ...prevActions];
      
      // Auto create a gap-analysis timeline event
      setTimelineEvents((prevEvents) => {
        const newEvent = {
          id: `TE-${Date.now()}`,
          actionId: generatedAction.id,
          phase: 'gap-analysis',
          title: 'Corrective action initiated',
          description: `Action initiated for outcome ${generatedAction.outcomeId} in course ${generatedAction.courseName}.`,
          status: 'completed',
          date: generatedAction.createdAt,
          updatedBy: 'System Monitor',
        };
        const updatedEvents = [newEvent, ...prevEvents];
        saveDataToStorage(updated, updatedEvents, notificationPreference);
        return updatedEvents;
      });

      return updated;
    });
  }, [notificationPreference]);

  const updateCorrectiveAction = useCallback((id, updates) => {
    setCorrectiveActions((prevActions) => {
      const updated = prevActions.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updates,
              resolvedAt: updates.status === 'resolved' ? new Date().toISOString().split('T')[0] : item.resolvedAt,
            }
          : item
      );
      
      // Log an implementation event if status changed
      const original = prevActions.find(item => item.id === id);
      if (original && updates.status && original.status !== updates.status) {
        setTimelineEvents((prevEvents) => {
          const newEvent = {
            id: `TE-${Date.now()}`,
            actionId: id,
            phase: updates.status === 'resolved' ? 'accredited' : 'implementation',
            title: `Status changed to ${updates.status}`,
            description: `Corrective action transitioned from '${original.status}' to '${updates.status}'.`,
            status: 'completed',
            date: new Date().toISOString().split('T')[0],
            updatedBy: 'System Trigger',
          };
          const updatedEvents = [newEvent, ...prevEvents];
          saveDataToStorage(updated, updatedEvents, notificationPreference);
          return updatedEvents;
        });
      } else {
        saveDataToStorage(updated, timelineEvents, notificationPreference);
      }

      return updated;
    });
  }, [timelineEvents, notificationPreference]);

  const deleteCorrectiveAction = useCallback((id) => {
    setCorrectiveActions((prevActions) => {
      const updatedActions = prevActions.filter((item) => item.id !== id);
      setTimelineEvents((prevEvents) => {
        const updatedEvents = prevEvents.filter((event) => event.actionId !== id);
        saveDataToStorage(updatedActions, updatedEvents, notificationPreference);
        return updatedEvents;
      });
      return updatedActions;
    });
  }, [notificationPreference]);

  const transitionActionStatus = useCallback((id, newStatus) => {
    updateCorrectiveAction(id, { status: newStatus });
  }, [updateCorrectiveAction]);

  const addTimelineEvent = useCallback((actionId, eventData) => {
    setTimelineEvents((prevEvents) => {
      const newEvent = {
        ...eventData,
        id: `TE-${Date.now()}`,
        actionId,
        date: new Date().toISOString().split('T')[0],
      };
      const updatedEvents = [newEvent, ...prevEvents];
      saveDataToStorage(correctiveActions, updatedEvents, notificationPreference);
      return updatedEvents;
    });
  }, [correctiveActions, notificationPreference]);

  const updateNotificationPreferences = useCallback((newPrefs) => {
    setNotificationPreference((prev) => {
      const updated = { ...prev, ...newPrefs };
      saveDataToStorage(correctiveActions, timelineEvents, updated);
      return updated;
    });
  }, [correctiveActions, timelineEvents]);

  return (
    <CQIDataContext.Provider
      value={{
        correctiveActions,
        timelineEvents,
        notificationPreference,
        selectedDept,
        searchQuery,
        setSelectedDept,
        setSearchQuery,
        createCorrectiveAction,
        updateCorrectiveAction,
        deleteCorrectiveAction,
        transitionActionStatus,
        addTimelineEvent,
        updateNotificationPreferences,
      }}
    >
      {children}
    </CQIDataContext.Provider>
  );
};

export default CQIDataContext;
