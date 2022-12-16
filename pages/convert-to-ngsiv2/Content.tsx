import { parse } from "papaparse";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  file: File[];
};

type GtfsAgency = {
  agency_id: string;
  agency_name: string;
  agency_email: string;
  agency_url: string;
  agency_lang: string;
  agency_phone: string;
  agency_timezone: string;
  agency_fare_url: string;
};

type GtfsAgencyForNGSIv2 = {
  id: string;
  type: string;
  agencyName: string;
  page: string;
  timezone: string;
  language: string;
  source: string;
};

export const ConvertToNGSIv2Content: React.FC = () => {
  const [before, setBefore] = useState<Array<GtfsAgency>>([]);
  const [after, setAfter] = useState<Array<GtfsAgencyForNGSIv2>>([]);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit = async (data: Inputs): Promise<void> => {
    if (data.file.length) {
      const jsonArr = await csvToJson(data.file[0]);
      const formattedJsonArr = await gtfsAgencyToNGSIv2(jsonArr);
      console.log("before", jsonArr);
      console.log("after", formattedJsonArr);
      setBefore(jsonArr);
      setAfter(formattedJsonArr);
    } else {
      console.log("ファイルなし");
    }
  };

  const csvToJson = async (file: File): Promise<Array<GtfsAgency>> => {
    return new Promise<any>((resolve, reject) => {
      parse(file, {
        header: true, // こいつがないと二次元配列になる。
        skipEmptyLines: true,
        complete: results => {
          // console.log("hoge", Object.prototype.toString.call(results?.data));
          resolve(results?.data);
        },
        error: error => {
          reject(new Error("csv parse err"));
          console.log(error);
        }
      });
    });
  };

  const gtfsAgencyToNGSIv2 = async (
    jsonArr: Array<GtfsAgency>
  ): Promise<Array<GtfsAgencyForNGSIv2>> => {
    const formattedJsonArr = jsonArr.map(json => {
      // 正規化の参考：https://github.com/smart-data-models/dataModel.UrbanMobility/blob/master/GtfsAgency/schema.json
      const formattedJson: GtfsAgencyForNGSIv2 = {
        id: json.agency_id,
        type: "GtfsAgency",
        agencyName: json.agency_name,
        page: json.agency_url,
        timezone: json.agency_timezone,
        language: json.agency_lang,
        source: ""
      };
      return formattedJson;
    });
    return formattedJsonArr;
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
          accept='.csv,.xlsx,.xls'
          {...register("file")}
        />
        <button className='btn btn-sm mt-2' type='submit'>
          変換
        </button>
      </form>
      <div className='flex gap-4'>
        <div>
          <p>before：agency_name</p>
          {before.map(json => (
            <div>{json.agency_name}</div>
          ))}
        </div>
        <div>
          <p>after：agencyName</p>
          {after.map(json => (
            <div>{json.agencyName}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
