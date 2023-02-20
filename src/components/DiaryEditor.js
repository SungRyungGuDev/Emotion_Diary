import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "./../App.js";

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { getStringDate } from "../util/date"
import { emotionList } from "../util/emotion";




function DiaryEditor({isEdit, originalData}) {
  
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const navigate = useNavigate();

  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if(content.length < 1) {
        contentRef.current.focus();
        return;
    }

    if(window.confirm(isEdit? "Are you sure want to edit this diary?" : "Are you sure want to create new diary?"))

    if(!isEdit) {
      onCreate(date, content, emotion);
    }else {
      onEdit(originalData.id, date, content, emotion);
    }
    navigate('/', {replace: true});
  }

  const handleRemove = () => {
    if (window.confirm("Are you sure you want to remove?")) {
      onRemove(originalData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if(isEdit){
      setDate(getStringDate(new Date(parseInt(originalData.date))));
      setEmotion(originalData.emotion)
      setContent(originalData.content)
    }
  }, [isEdit, originalData]);

  
  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "Edit the diary" : "Create a new diary"}
        leftChild={
          <MyButton
            text={"< Back"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"Remove"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>When is it today?</h4>
          <div className="input-box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
            <h4>Today's emotion</h4>
            <div className='input_box emotion_list_wrapper'>
                {emotionList.map((it)=>(
                    <EmotionItem key={it.emotion_id} {...it} 
                    onClick={handleClickEmotion} 
                    isSelected={it.emotion_id === emotion}
                    />
                ))}
            </div>
        </section>
        <section>
            <h4>Today's diary</h4>
            <div className='input_box text_wrapper'>
                <textarea ref={contentRef} value={content} onChange={(e)=> setContent(e.target.value)} />
            </div>
        </section>
        <section>
            <div className='control_box'>
                    <MyButton text={"Cancel"} type={"negative"} onClick={()=>navigate(-1)} />
                    <MyButton text={"Complete"} type={"positive"} onClick={handleSubmit} />
            </div>
        </section>
      </div>
    </div>
  );
}

export default DiaryEditor;
