import { useContext } from 'react';
import CQIDataContext from '../context/CQIDataContext';

export const useCQIData = () => {
  const context = useContext(CQIDataContext);
  if (!context) {
    throw new Error('useCQIData must be used within a CQIDataProvider');
  }
  return context;
};

export default useCQIData;
