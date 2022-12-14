import { parse } from "papaparse";
import { useForm } from "react-hook-form";

type Inputs = {
  file: File[];
};

export const ConvertToNGSIv2Content: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit = async (data: Inputs): Promise<void> => {
    const json = await csvToJson(data.file[0]);
    console.log(json);
  };

  const csvToJson = async (file: File) => {
    return new Promise((resolve, reject) => {
      parse(file, {
        complete: results => {
          resolve(results?.data);
        },
        error: () => {
          reject(new Error("csv parse err"));
        }
      });
    });
  };

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

      <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("file")}
        />
        <button className='btn btn-sm mt-2' type='submit'>
          変換
        </button>
      </form>
    </div>
  );
};
