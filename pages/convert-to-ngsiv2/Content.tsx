export const ConvertToNGSIv2Content: React.FC = () => {
  return (
    <div>
      <label
        className='block mb-2 text-sm font-medium text-gray-900'
        htmlFor='file_input'>
        Upload file
      </label>
      <input
        className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
        aria-describedby='file_input_help'
        id='file_input'
        type='file'
      />
      <p className='mt-1 text-sm text-gray-500'>
        SVG, PNG, JPG or GIF (MAX. 800x400px).
      </p>
    </div>
  );
};
