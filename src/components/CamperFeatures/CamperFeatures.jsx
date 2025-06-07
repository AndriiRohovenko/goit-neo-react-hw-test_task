import styles from './CamperFeatures.module.css';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import Loader from '../Loader/Loader';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';
// import { selectError, selectLoading } from '../../redux/campersSlice';

function CamperFeatures() {
  // const { camperId } = useParams();

  // const isLoading = useSelector(selectLoading);
  // const error = useSelector(selectError);

  // const defaultImg =
  //   'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      <div className={styles.camperFeaturesWrapper}>
        <p>Here will be Camper Features Soon ..</p>
        {/* {error == true && (
          <ErrorMessage message={"We don't have any Features for this Camper"} />
        )}
        <ul>
          {isLoading ? (
            <Loader />
          ) : (
            hits.map(actor => (
              <li className={styles.castItemWrapper} key={actor.id}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : defaultImg
                  }
                  alt="Actor photo"
                />
                <b>
                  <p>{actor.name}</p>
                </b>
                <p>{actor.character}</p>
              </li>
            ))
          )}
        </ul> */}
      </div>
    </>
  );
}

export default CamperFeatures;
