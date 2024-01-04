import { useState } from 'react';

import './styles.css';
import { Footer } from './Footer';
import { ImagePeview } from './ImagePreview';
import { EnhanceProperty, ImageUpload } from './ImageUpload';
import { enhance } from '../../utils/enhancer';

export interface IImageEnhancerProps {}

export function ImageEnhancer(props: IImageEnhancerProps) {
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imageEnhanced, setImageEnhanced] = useState<string | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancementProperty, setEnhancementProperty] =
    useState<EnhanceProperty>('UPSCALE');
  const [error, setError] = useState('');

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.length) {
      return;
    }

    clearError();
    setIsUploading(true);
    setImageFile(e.target.files[0]);
    setIsUploading(false);
  };

  const onClickEnhance = async () => {
    if (!imageFile) {
      return;
    }

    clearError();
    setIsEnhancing(true);
    const result = await enhance(enhancementProperty, imageFile);
    if (!result || !result.image) {
      setError('Uh-oh. Something went wrong. Please try again!');
      setIsEnhancing(false);
      return;
    }

    setImageEnhanced(result.image);
    setIsEnhancing(false);
  };

  const onChangeProperty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnhancementProperty(e.target.value as EnhanceProperty);
  };

  const clearError = () => {
    if (error) {
      setError('');
    }
  };

  return (
    <div className='image-enhancer'>
      <div className='header'>
        AI Image <span>Enhancer</span>
      </div>
      <div className='image-preview-wrapper'>
        <ImagePeview
          image={imageFile ? URL.createObjectURL(imageFile) : 'default-low.png'}
          isLoading={isUploading}
          showDownload={false}
          loadingText='Uploading the image...'
        />
        <ImagePeview
          image={imageEnhanced ? imageEnhanced : 'default-high.png'}
          isLoading={isEnhancing}
          showDownload={false}
          loadingText='Enhancing the image...'
        />
      </div>
      {error && <div className='error'>{error}</div>}
      <ImageUpload
        onChange={onUpload}
        onChangeProperty={onChangeProperty}
        onClickEnhance={onClickEnhance}
        disabled={isUploading || !imageFile}
      />

      <Footer />
    </div>
  );
}
