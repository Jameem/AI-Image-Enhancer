import { Spinner } from '../Spinner';

export const ImagePeview = ({
  image,
  isLoading,
  showDownload,
  loadingText,
}: {
  image: string;
  isLoading: boolean;
  showDownload: boolean;
  loadingText: string;
}) => {
  return (
    <div className='image-wrapper '>
      <div className='image'>
        <img src={image} alt='aiimage' className={isLoading ? 'blur' : ''} />
        {showDownload && (
          <a
            href={image}
            download={`${prompt}.png`}
            className='download'
            target='blank'
          >
            Download
          </a>
        )}
      </div>
      <div className={isLoading ? 'text' : 'hide-text'}>{loadingText}</div>
      {isLoading && <Spinner />}
    </div>
  );
};
