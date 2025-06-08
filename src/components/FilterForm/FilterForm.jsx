import styles from './FilterForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleEquipment,
  setVehicleType,
  resetFilters,
  selectFilters,
} from '../../redux/filtersSlice';
import { useState } from 'react';

const filterOptions = {
  vehicleEquipment: [
    { label: 'AC', key: 'AC' },
    { label: 'Automatic', key: 'automatic' },
    { label: 'Kitchen', key: 'kitchen' },
    { label: 'TV', key: 'TV' },
    { label: 'Bathroom', key: 'bathroom' },
  ],
  vehicleType: [
    { label: 'Van', key: 'van' },
    { label: 'Fully Integrated', key: 'fullyIntegrated' },
    { label: 'Alcove', key: 'alcove' },
  ],
};

function FilterForm() {
  const dispatch = useDispatch();
  const { selectedEquipment, selectedVehicleType } = useSelector(selectFilters);
  console.log(selectedEquipment);
  console.log(selectedVehicleType);

  const [equipment, setEquipment] = useState(selectedEquipment);
  const [vehicleType, setVehicleTypeLocal] = useState(selectedVehicleType);

  const handleEquipmentToggle = key => {
    setEquipment(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleVehicleTypeSelect = key => {
    setVehicleTypeLocal(key);
  };

  const handleSubmit = e => {
    e.preventDefault();

    equipment.forEach(eq => dispatch(toggleEquipment(eq)));
    dispatch(setVehicleType(vehicleType));
  };

  const handleReset = () => {
    setEquipment([]);
    setVehicleTypeLocal('');
    dispatch(resetFilters());
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <h3>Vehicle Equipment</h3>
      <div className={styles.filterGroup}>
        {filterOptions.vehicleEquipment.map(option => (
          <button
            key={option.key}
            type="button"
            onClick={() => handleEquipmentToggle(option.key)}
            className={`${styles.filterBtn} ${
              equipment.includes(option.key) ? styles.active : ''
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <h3>Vehicle Type</h3>
      <div className={styles.filterGroup}>
        {filterOptions.vehicleType.map(option => (
          <button
            key={option.key}
            type="button"
            onClick={() => handleVehicleTypeSelect(option.key)}
            className={`${styles.filterBtn} ${
              vehicleType === option.key ? styles.active : ''
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
        <button type="button" onClick={handleReset} className={styles.resetBtn}>
          Reset
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
