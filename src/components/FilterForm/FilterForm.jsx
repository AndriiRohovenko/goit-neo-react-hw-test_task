import styles from './FilterForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleEquipment,
  setVehicleType,
  setVehicleLocation,
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
  vehicleLocation: [
    { label: 'Ukraine, Kyiv', key: 'Ukraine, Kyiv' },
    { label: 'Ukraine, Odessa', key: 'Ukraine, Odessa' },
  ],
};

function FilterForm() {
  const dispatch = useDispatch();
  const { selectedEquipment, selectedVehicleType, selectedLocation } =
    useSelector(selectFilters);

  const [equipment, setEquipment] = useState(selectedEquipment);
  const [vehicleType, setVehicleTypeLocal] = useState(selectedVehicleType);
  const [vehicleLocation, setVehicleLocationLocal] = useState(selectedLocation);

  const handleEquipmentToggle = key => {
    setEquipment(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleVehicleTypeSelect = key => {
    setVehicleTypeLocal(key);
  };

  const handleVehicleLocationSelect = key => {
    setVehicleLocationLocal(key);
  };

  const handleSubmit = e => {
    e.preventDefault();

    equipment.forEach(eq => dispatch(toggleEquipment(eq)));
    dispatch(setVehicleType(vehicleType));
    dispatch(setVehicleLocation(vehicleLocation));
  };

  const handleReset = () => {
    setEquipment([]);
    setVehicleTypeLocal('');
    setVehicleLocation('');
    dispatch(resetFilters());
  };

  return (
    <form className={styles.filterForm} onSubmit={handleSubmit}>
      <h3>Vehicle Location</h3>
      <div className={styles.filterGroup}>
        <select
          value={vehicleLocation}
          onChange={e => handleVehicleLocationSelect(e.target.value)}
          className={styles.dropdown}
        >
          <option value="">Select location</option>
          {filterOptions.vehicleLocation.map(option => (
            <option key={option.key} value={option.key}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

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
