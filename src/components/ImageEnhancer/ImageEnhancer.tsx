import * as React from 'react';

import './styles.css';
import { Footer } from './Footer';
import { ImagePeview } from './ImagePreview';
import { EnhanceProperty, ImageUpload } from './ImageUpload';
import { enhance } from '../../utils/enhancer';

export interface IImageEnhancerProps {}

export function ImageEnhancer(props: IImageEnhancerProps) {
  const [imageFile, setImageFile] = React.useState<File | undefined>();
  const [imageEnhanced, setImageEnhanced] = React.useState<
    string | undefined
  >();
  const [isUploading, setIsUploading] = React.useState(false);
  const [isEnhancing, setIsEnhancing] = React.useState(false);
  const [enhancementProperty, setEnhancementProperty] =
    React.useState<EnhanceProperty>('UPSCALE');

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.length) {
      return;
    }

    setIsUploading(true);
    setImageFile(e.target.files[0]);
    setIsUploading(false);
  };

  const onClickEnhance = async () => {
    if (!imageFile) {
      return;
    }

    setIsEnhancing(true);

    let enhancedImage;

    switch (enhancementProperty) {
      case 'UPSCALE':
        enhancedImage = await enhance('UPSCALE', imageFile);
        break;
      case 'DEBLUR':
        enhancedImage = await enhance('DEBLUR', imageFile);
        break;
      case 'DENOISE':
        enhancedImage = await enhance('DENOISE', imageFile);
        break;
      case 'LOWLIGHT':
        enhancedImage = await enhance('LOWLIGHT', imageFile);
        break;
      case 'RETOUCH':
        enhancedImage = await enhance('RETOUCH', imageFile);
        break;
      case 'DERAIN':
        enhancedImage = await enhance('DERAIN', imageFile);
        break;
      case 'DEHAZEINDOOR':
        enhancedImage = await enhance('DEHAZEINDOOR', imageFile);
        break;
      case 'DEHAZEOUTDOOR':
        enhancedImage = await enhance('DEHAZEOUTDOOR', imageFile);
        break;
    }

    if (enhancedImage) {
      setImageEnhanced(enhancedImage);
      setIsEnhancing(false);
    }
  };

  const onChangeProperty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnhancementProperty(e.target.value as EnhanceProperty);
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
