export const ConvertToNGSIv2Content: React.FC = () => {
  return (
    <div className='px-4'>
      <div className='mt-6 mb-6'>
        <select
          className='select-sm w-full max-w-xs bg-black/5'
          defaultValue=''>
          <option disabled value=''>
            添付するファイル形式
          </option>
          <option value='csv'>.csv</option>
          <option value='txt'>.txt</option>
        </select>
      </div>

      <label
        className='block mb-2 text-sm font-medium text-gray-900'
        htmlFor='file_input'>
        ファイルアップロード
      </label>
      <input
        className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'
        aria-describedby='file_input_help'
        id='file_input'
        type='file'
      />
    </div>
  );
};
