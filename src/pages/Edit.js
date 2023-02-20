import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const { id } = useParams();
  const [originalData, setOriginalData] = useState();

  useEffect(()=>{
    if(diaryList.length >= 1){
      const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));
      console.log(targetDiary);

    if(targetDiary){
      setOriginalData(targetDiary)
    }else{
      navigate('/', {replace: true});
    }
  }
  },[id, diaryList])


  return (
    <div>
      {originalData && <DiaryEditor isEdit={true} originalData={originalData} />}
    </div>
  );
};

export default Edit;