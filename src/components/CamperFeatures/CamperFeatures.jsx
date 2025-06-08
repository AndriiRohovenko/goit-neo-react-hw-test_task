import styles from './CamperFeatures.module.css';

import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectError,
  selectLoading,
  selectSingleCamper,
} from '../../redux/campersSlice';

function CamperFeatures() {
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { camperId } = useParams();
  const camper = useSelector(state => selectSingleCamper(state, camperId));
  return (
    <>
      <div className={styles.camperFeaturesWrapper}>
        {error == true && (
          <ErrorMessage
            message={"We don't have any Features for this Camper"}
          />
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.featuresWrapper}>
            <p>{camper.transmission}</p>
            <p>{camper.engine}</p>
            {camper.AC ? <p>AC</p> : null}
            {camper.bathroom ? <p>bathroom</p> : null}
            {camper.kitchen ? <p>Kitchen</p> : null}
            {camper.TV ? <p>TV</p> : null}
            {camper.radio ? <p>Radio</p> : null}
            {camper.refrigerator ? <p>Refrigerator</p> : null}

            {camper.microwave ? <p>Microwave</p> : null}
            {camper.gas ? <p>Gas</p> : null}
            {camper.water ? <p>Water</p> : null}
          </div>
        )}
        <p className={styles.camperDetailsTitle}>Vehicle details</p>
        <div className={styles.camperDetails}>
          <div className={styles.camperFeatureDetailsLeft}>
            <p>Form</p>
            <p>Length</p>
            <p>Width</p>
            <p>Height </p>
            <p>Tank</p>
            <p>Consumption</p>
          </div>
          <div className={styles.camperFeatureDetailsRight}>
            <p>{camper.form}</p>
            <p>{camper.length}</p>
            <p>{camper.width}</p>
            <p> {camper.height}</p>
            <p> {camper.tank}</p>
            <p>{camper.consumption}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CamperFeatures;
