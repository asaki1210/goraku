import Header from "../Header/Header";
import ProjectContents from "./ProjectContents";
import ReturnContents from "./ReturnContents";
import { FormEvent, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Timestamp, collection, doc, setDoc, addDoc } from "firebase/firestore";
import { getDatabase, onChildAdded, push } from "@firebase/database";
import { ref, uploadBytes } from "firebase/storage";
import {
  initializeFirebaseApp,
  firestore,
  storage,
} from "@/app/firebase/setup";
import { area, category } from "../../lib/select";

initializeFirebaseApp();

type Props = {
  id: string;
};
interface Body {
  photo?: string;
  headline?: string;
  description?: string;
}

interface Return {
  photo?: string;
  price?: number;
  description?: string;
}

interface Detail {
  targetAmount: number;
  closingDate: Date;
  prefectures: number;
  category: number;
}

interface SetDetail {
  description: string;
  photo: string;
  headline: string;
}

interface FormData {
  title: string;
  createdBy: string;
  body: Body[];
  detail: Detail;
  return: Return[];
}

interface Data {
  people: number;
  amountAchieved: number;
  targetAmount: number;
  return: Return[];
  detail: Body[];
  createdDate: Timestamp;
  photo?: string;
  deleteDate?: Timestamp;
  createdBy: string;
  prefectures: number;
  category: number;
  title: string;
  updatedDate: Timestamp;
  closingDate: Timestamp;
}

export default function ProjectCreate({
  id,
  changecreate,
}: {
  id: Props;
  changecreate: () => void;
}) {
  const [login, setlogin] = useState<"active" | "inactive">("inactive");
  //登録
  const [userid, setUserid] = useState<string>("");
  const [formDataList, setFormDataList] = useState<FormData>({
    title: "",
    createdBy: "",
    body: [
      { photo: "", headline: "", description: "" },
      { photo: "", headline: "", description: "" },
      { photo: "", headline: "", description: "" },
    ],
    detail: {
      targetAmount: 0,
      closingDate: new Date(),
      prefectures: 0,
      category: 0,
    },
    return: [
      { photo: "", price: 0, description: "" },
      { photo: "", price: 0, description: "" },
      { photo: "", price: 0, description: "" },
    ],
  });
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    setFormDataList({ ...formDataList, createdBy: id });
  }, []);

  //登録処理
  const handleSendMessage = async (e) => {
    e.preventDefault();

    const now = new Date();
    if (formDataList.title.length == 0) {
      setFormError("プロジェクトタイトルを入力してください。");
      return;
    } else if (formDataList.body[0].headline?.length == 0) {
      setFormError("見出しを入力してください。");
      return;
    } else if (formDataList.body[0].description?.length == 0) {
      setFormError("見出しの説明を入力してください。");
      return;
    } else if (formDataList.detail.targetAmount <= 0) {
      setFormError("目標金額を1円以上にしてください。");
      return;
    } else if (formDataList.detail.closingDate < now) {
      setFormError("後日以降にしてください。");
      return;
    } else if (formDataList.detail.prefectures == 0) {
      setFormError("地域を入力してください。");
      return;
    } else if (formDataList.detail.category == 0) {
      setFormError("カテゴリーを入力してください。");
      return;
    } else if (formDataList.return[0].price == 0) {
      setFormError("リターンの金額を1円以上にしてください。");
      return;
    } else if (formDataList.return[0].description?.length == 0) {
      setFormError("リターンの説明を入力してください。");
      return;
    }

    //空の配列削除
    formDataList.body = formDataList.body.filter(
      (item) =>
        item.photo?.length || item.headline?.length || item.description?.length
    );

    formDataList.return = formDataList.return.filter(
      (item) =>
        item.photo?.length || item.price == 0 || item.description?.length
    );

    console.log(formDataList);

    //firestoreag登録
    try {
      const gsReference = ref(storage, `detail/`);
      if (e.target[1].files[0].name) {
        const imageRef = ref(gsReference, e.target[1].files[0].name);
        uploadBytes(imageRef, e.target[1].files[0]).then(() => {
          console.log("Uploaded a file!");
        });
      }
      if (e.target[4].files[0].name) {
        const imageRef = ref(gsReference, e.target[4].files[0].name);
        uploadBytes(imageRef, e.target[4].files[0]).then(() => {
          console.log("Uploaded a file!");
        });
      }
      if (e.target[7].files[0].name) {
        const imageRef = ref(gsReference, e.target[7].files[0].name);
        uploadBytes(imageRef, e.target[7].files[0]).then(() => {
          console.log("Uploaded a file!");
        });
      }
    } catch (err) {
      console.log(err);
    }

    try {
      const rsReference = ref(storage, `return/`);
      if (e.target[14].files[0].name) {
        const imageRef = ref(rsReference, e.target[14].files[0].name);
        uploadBytes(imageRef, e.target[14].files[0]).then(() => {
          console.log("Uploaded a file!");
        });
      }
      if (e.target[17].files[0].name) {
        const imageRef = ref(rsReference, e.target[17].files[0].name);
        uploadBytes(imageRef, e.target[17].files[0]).then(() => {
          console.log("Uploaded a file!");
        });
      }
      if (e.target[20].files[0].name) {
        const imageRef = ref(rsReference, e.target[20].files[0].name);
        uploadBytes(imageRef, e.target[20].files[0]).then(() => {
          console.log("Uploaded a file!");
        });
      }
    } catch (err) {
      console.log(err);
    }

    if (formDataList.body[0].photo) {
      var tmp: Data = {
        amountAchieved: 0,
        category: formDataList.detail.category,
        closingDate: Timestamp.fromDate(formDataList.detail.closingDate),
        createdBy: formDataList.createdBy,
        createdDate: Timestamp.fromDate(now),
        deleteDate: Timestamp.fromDate(now),
        detail: [...formDataList.body],
        people: 0,
        photo: formDataList.body[0].photo,
        prefectures: formDataList.detail.prefectures,
        return: [...formDataList.return],
        targetAmount: formDataList.detail.targetAmount,
        title: formDataList.title,
        updatedDate: Timestamp.fromDate(now),
      };
      //登録
      const docRef = await addDoc(collection(firestore, "Projects"), tmp);
      changecreate();
    }
  };

  const photoChange = (index: number, en: any) => {
    setFormDataList({
      ...formDataList,
      body: formDataList.body.map((item: Body, i: number) => {
        if (index != i) {
          return item;
        }
        item.photo = en.target.files[0].name;
        return item;
      }),
    });
  };

  // const photoChange = (index: number, en: any) => {
  //   const files = en.target.files;
  //   console.log(files);

  //   if (files.length > 0) {
  //     const file = files[0];
  //     const reader = new FileReader();

  //     reader.readAsText(file, "UTF-8");
  //     //console.log(reader);

  //     reader.onload = (e) => {
  //       console.log(e.target?.result);
  //       console.log("ok");

  //       if (e.target?.result) {
  //         setFormDataList({
  //           ...formDataList,
  //           body: formDataList.body.map((item: Body, i: number) =>
  //             index !== i ? item : { ...item, photo: String(e.target?.result) }
  //           ),
  //         });
  //       }
  //     };
  //   }
  // };

  //firebase storage
  // const photoChange = (index: number, en: any) => {
  //   // console.log(en.target.files[0].name);
  //   const file = en.target.files[0];
  //   const storageRef = ref(storage, "image/" + file.name);
  //   uploadBytes(storageRef, file).then((snapsshot) => {
  //     console.log("upload");
  //   });
  // };

  const headlineChange = (index: number, headline: string) => {
    setFormDataList({
      ...formDataList,
      body: formDataList.body.map((item: Body, i: number) => {
        if (index != i) {
          return item;
        }
        item.headline = headline;
        return item;
      }),
    });
  };
  const descChange = (index: number, description: string) => {
    setFormDataList({
      ...formDataList,
      body: formDataList.body.map((item: Body, i: number) => {
        if (index != i) {
          return item;
        }
        item.description = description;
        return item;
      }),
    });
  };

  //リターン
  const retrunphotoChange = (index: number, photo: any) => {
    setFormDataList({
      ...formDataList,
      return: formDataList.return.map((item: Return, i: number) => {
        if (index != i) {
          return item;
        }
        item.photo = photo.target.files[0].name;
        return item;
      }),
    });
  };

  const returnpriceChange = (index: number, price: number) => {
    setFormDataList({
      ...formDataList,
      return: formDataList.return.map((item: Return, i: number) => {
        if (index != i) {
          return item;
        }
        item.price = price;
        return item;
      }),
    });
  };
  const returndescChange = (index: number, description: string) => {
    setFormDataList({
      ...formDataList,
      return: formDataList.return.map((item: Return, i: number) => {
        if (index != i) {
          return item;
        }
        item.description = description;
        return item;
      }),
    });
  };

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [formError]);

  return (
    <div>
      {/* <div>id:{id}</div> */}
      <form onSubmit={handleSendMessage}>
        <div className="flex flex-col content-center items-center justify-center mt-8">
          {formError && <div className="text-red-500">{formError}</div>}
          <input
            type="text"
            onChange={(e) =>
              setFormDataList({ ...formDataList, title: e.target.value })
            }
            placeholder="プロジェクトタイトルを入力してください"
            className="flex content-center items-center rounded-3xl border-4 border-dashed border-[#FFBF91] px-4 py-6 w-[28%] outline-none"
          />
        </div>
        <div className=" flex px-8 mt-8 gap-8 justify-center items-start">
          <div className="flex flex-col gap-4 w-[640px]">
            <ProjectContents
              index={0}
              photoChange={photoChange}
              headlineChange={headlineChange}
              descChange={descChange}
              key={0}
            />
            <ProjectContents
              index={1}
              photoChange={photoChange}
              headlineChange={headlineChange}
              descChange={descChange}
              key={1}
            />
            <ProjectContents
              index={2}
              photoChange={photoChange}
              headlineChange={headlineChange}
              descChange={descChange}
              key={2}
            />
          </div>
          <div className="flex w-[425px] flex-col justify-center items-start gap-4">
            <div className="flex flex-col items-start px-11 py-4 gap-2 rounded-3xl border-[#FFBF91] border-solid border bg-[#FFFCFC]">
              <p className="text-[#7E7C7C] text-xl font-bold">目標金額</p>
              <div className="flex gap-3 items-center cont w-full ent-center">
                <Image
                  src={"/money.svg"}
                  width={53}
                  height={56}
                  alt="目標金額"
                ></Image>
                <input
                  type="number"
                  onChange={(e) =>
                    setFormDataList({
                      ...formDataList,
                      detail: {
                        ...formDataList.detail,
                        targetAmount: Number(e.target.value),
                      },
                    })
                  }
                  placeholder="目標金額を入力してください"
                  className="inline-block w-full border-4 border-dashed border-[#FFBF91] rounded-3xl outline-none h-10 p-4"
                />
              </div>
              <p className="text-[#7E7C7C] text-xl font-bold w-full">
                募集期間
              </p>
              <div className="flex gap-3 items-center content-center w-full">
                <Image
                  src={"/timer2.svg"}
                  width={51}
                  height={54}
                  alt="募集期間"
                ></Image>
                <input
                  type="date"
                  onChange={(e) =>
                    setFormDataList({
                      ...formDataList,
                      detail: {
                        ...formDataList.detail,
                        closingDate: new Date(e.target.value),
                      },
                    })
                  }
                  className="inline-block border-4 border-dashed border-[#FFBF91] rounded-3xl outline-none h-10 p-4 text-[#9CA3AF] w-full"
                />
              </div>
              <p className="text-[#7E7C7C] text-xl font-bold">場所</p>
              <div className="flex gap-3 items-center content-center w-full">
                <Image
                  src={"/Location.svg"}
                  width={51}
                  height={54}
                  alt="場所"
                ></Image>
                <select
                  name="address"
                  onChange={(e) =>
                    setFormDataList({
                      ...formDataList,
                      detail: {
                        ...formDataList.detail,
                        prefectures: Number(e.target.value),
                      },
                    })
                  }
                  className="flex w-full items-center content-center border-4 border-dashed border-[#FFBF91] rounded-3xl outline-none h-10 px-4 text-[#9CA3AF]"
                >
                  {area.map((a, i) => (
                    <option value={i} key={i}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[#7E7C7C] text-xl font-bold">カテゴリー</p>
              <div className="flex gap-3 items-center content-center w-full">
                <Image
                  src={"/category.svg"}
                  width={51}
                  height={54}
                  alt="カテゴリー"
                ></Image>
                <select
                  name="category"
                  onChange={(e) =>
                    setFormDataList({
                      ...formDataList,
                      detail: {
                        ...formDataList.detail,
                        category: Number(e.target.value),
                      },
                    })
                  }
                  className="flex w-full items-center content-center border-4 border-dashed border-[#FFBF91] rounded-3xl outline-none h-10 px-4 text-[#9CA3AF]"
                >
                  {category.map((c, i) => (
                    <option value={i} key={i}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-start content-start">
              <div className="flex gap-3 items-center content-center">
                <Image
                  src={"/Gift.svg"}
                  width={57}
                  height={69}
                  alt="リターンイラスト"
                ></Image>
                <p className="text-[#FFBF91] font-bold text-4xl">リターン</p>
              </div>
            </div>
            <div className="flex flex-col flex-wrap w-full items-center content-center gap-5">
              <ReturnContents
                index={0}
                retrunphotoChange={retrunphotoChange}
                returnpriceChange={returnpriceChange}
                returndescChange={returndescChange}
                key={0}
              />
              ,
              <ReturnContents
                index={1}
                retrunphotoChange={retrunphotoChange}
                returnpriceChange={returnpriceChange}
                returndescChange={returndescChange}
                key={1}
              />
              ,
              <ReturnContents
                index={2}
                retrunphotoChange={retrunphotoChange}
                returnpriceChange={returnpriceChange}
                returndescChange={returndescChange}
                key={2}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <div className="flex w-[80%] bg-[#FFBF91] rounded-lg justify-center p-4 shadow-xl">
            <button type={"submit"} className="text-white font-bold">
              プロジェクトを登録
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
