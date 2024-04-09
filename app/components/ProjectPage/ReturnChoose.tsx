import Image from "next/image";
import Link from "next/link";
export default function ReturnChoose({
  photo,
  price,
  description,
  index,
  docId,
  show,
  changeShow,
}: {
  photo: string;
  price: string;
  description: string;
  index: number;
  docId: string;
  show: boolean;
  changeShow: () => void;
}) {
  return (
    <div className="flex flex-col w-[376px] items-start gap-4 py-4 px-8 bg-[#FFFCFC] rounded-3xl border-[#FFBF91] border-solid border">
      <Image src={`${photo}`} width={310} height={151} alt="バンド3"></Image>
      <div className="flex items-center content-center">
        <p className="font-bold text-2xl">{price}円</p>
        <p className="text-base font-normal text-[#7E7C7C]"> + システム料金</p>
      </div>
      <p className="text-base font-normal">{description}</p>
      <Link
        href={`/${docId}?return=${index}`}
        onClick={() => changeShow(index)}
      >
        <button className="bg-[#FFBF91] rounded-lg px-[67px] py-[5px] text-white">
          このリターンで支援する
        </button>
      </Link>
    </div>
  );
}
