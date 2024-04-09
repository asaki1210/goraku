export default function ReturnContents({
  index,
  retrunphotoChange,
  returnpriceChange,
  returndescChange,
}: {
  index: number;
  retrunphotoChange: (index: number, photo: any) => void;
  returnpriceChange: (index: number, price: number) => void;
  returndescChange: (index: number, description: string) => void;
}) {
  return (
    <div>
      <div className="flex flex-col gap-4 w-[425px] rounded-3xl border border-[#FFBF91] border-solid bg-[#FFFCFC] p-4">
        <label
          className="flex items-center justify-center rounded-3xl border-4 border-dashed border-[#FFBF91] w-full h-[159px]"
          htmlFor={`returnFile-${index}`}
        >
          <input
            type="file"
            id={`returnFile-${index}`}
            onChange={(e) => retrunphotoChange(index, e)}
            placeholder="画像を選択"
            className="justify-center items-center hidden"
          />
          <span className="px-3 py-2 text-white text-lg bg-[#FFBF91] rounded-xl">
            画像アップロード
          </span>
        </label>
        <input
          type="number"
          onChange={(e) => returnpriceChange(index, Number(e.target.value))}
          min="1"
          max="100000000"
          placeholder="金額を入力してください"
          className="flex items-center px-8 w-full rounded-3xl border-4 border-dashed border-[#FFBF91] h-[58px] outline-none"
        ></input>
        <label
          className="flex w-full items-start py-4 px-8 h-[122px] rounded-3xl border-4 border-dashed border-[#FFBF91]"
          htmlFor={`desc-${index}`}
        >
          <textarea
            name={`desc-${index}`}
            onChange={(e) => returndescChange(index, e.target.value)}
            placeholder="テキストを入力してください"
            className="w-full h-full outline-none resize-none"
          />
        </label>
      </div>
    </div>
  );
}
