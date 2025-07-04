import styles from './FilterForm.module.css';
import sharedStyles from '../../components/App/App.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleEquipment,
  setVehicleType,
  setVehicleLocation,
  resetFilters,
  selectFilters,
} from '../../redux/filtersSlice';
import { useState } from 'react';

import alcoveTypeIcon from '/icons/alcoveType.svg';
import fullTypeIcon from '/icons/fullTypeIcon.svg';
import vanTypeIcon from '/icons/vanTypeIcon.svg';

const vehicleIconsMap = {
  alcove: alcoveTypeIcon,
  fullyIntegrated: fullTypeIcon,
  van: vanTypeIcon,
};

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
    { label: 'Ukraine, Odesa', key: 'Ukraine, Odesa' },
    { label: 'Ukraine, Poltava', key: 'Ukraine, Poltava' },
    { label: 'Ukraine, Dnipro', key: 'Ukraine, Dnipro' },
    { label: 'Ukraine, Kharkiv', key: 'Ukraine, Kharkiv' },
    { label: 'Ukraine, Sumy', key: 'Ukraine, Sumy' },
    { label: 'Ukraine, Lviv', key: 'Ukraine, Lviv' },
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
      <h2 className={styles.filtersSectionTitle}>Location</h2>
      <div className={styles.locationFilterWrapper}>
        <div className={styles.filterGroup}>
          <img
            className={styles.locationIcon}
            src="/icons/locationIcon.svg"
            alt="location icon"
          />
          <select
            value={vehicleLocation}
            onChange={e => handleVehicleLocationSelect(e.target.value)}
            className={styles.dropdown}
            name="locationSelector"
          >
            <option value="">Select location</option>
            {filterOptions.vehicleLocation.map(option => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h2 className={styles.filtersSectionTitle}>Filters</h2>
      <h3 className={styles.filtersTitle}>Vehicle Equipment</h3>
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

      <h3 className={styles.filtersTitle}>Vehicle Type</h3>
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
            <img
              src={vehicleIconsMap[option.key]}
              alt={`${option.label} icon`}
              className={styles.vehicleTypeIcon}
            />

            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={sharedStyles.mainBtn}>
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className={sharedStyles.mainBtn}
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default FilterForm;
