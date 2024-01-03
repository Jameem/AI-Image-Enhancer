import React from 'react';

export type EnhanceProperty =
  | 'UPSCALE'
  | 'DEBLUR'
  | 'DENOISE'
  | 'RETOUCH'
  | 'DERAIN'
  | 'LOWLIGHT'
  | 'DERAIN'
  | 'DEHAZEINDOOR'
  | 'DEHAZEOUTDOOR';

interface IImageUpload {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onChangeProperty?: React.ChangeEventHandler<HTMLSelectElement>;
  disabled: boolean;
  onClickEnhance: () => void;
}

export const ImageUpload = ({
  onChange,
  disabled,
  onClickEnhance,
  onChangeProperty,
}: IImageUpload) => {
  return (
    <div className='upload-wrapper'>
      <div className='upload'>
        <input
          type='file'
          className='upload-input file-input'
          accept='image/*'
          onChange={onChange}
        />
        <div>
          <small>Enhancement Property</small>
          <select className='enhancement-property' onChange={onChangeProperty}>
            <option value='UPSCALE'>Upscale</option>
            <option value='LOWLIGHT'>Enhance Low Light</option>
            <option value='DENOISE'>Denoise</option>
            <option value='RETOUCH'>Retouch</option>
            <option value='DERAIN'>Derain</option>
            <option value='RETOUCH'>Retouch</option>
            <option value='DERAIN'>Derain</option>
            <option value='DEBLUR'>Deblur</option>
            <option value='DEHAZEINDOOR'>Dehaze Indoor</option>
            <option value='DEHAZEOUTDOOR'>Dehaze Outdoor</option>
          </select>
        </div>

        <button className='button' disabled={disabled} onClick={onClickEnhance}>
          Enhance
        </button>
      </div>
    </div>
  );
};
