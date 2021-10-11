import axios from 'axios';
import { createRef, useRef, useState } from "react";


const AddMoviePage = () => {

    const formRef = createRef();
    const fileRef = useRef();

    const [img, setImg] = useState('');

    const onSubmitClicked = async (e) => {
        e.preventDefault();
        let formData = new FormData(formRef.current);
       
        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        try {
            const test = await axios.post('http://localhost:3030/admin/test', formData, {
                headers: { 'content-type': 'multipart/form-data' },
                withCredentials: true,
            });
            console.log(test);
        } catch (e) {
            console.log(e);
        }

    }

    return (
        <div className="add-movie__container">
            <h1>הוסף סרט</h1>
            <form ref={formRef} onSubmit={onSubmitClicked}>
                <label >שם הסרט בעברית*</label>
                <input required type="text" id="nameInHebrew" name="nameInHebrew" />

                <label >שם הסרט באנגלית*</label>
                <input required type="text" id="nameInEnglish" name="nameInEnglish" />


                <label >ז'אנר*</label>
                <select required id="targetAudience" name="targetAudience">
                    <option>למשפחה</option>
                    <option>מתח / אימה</option>
                    <option>דרמה</option>
                    <option>דרמה, קומדיה / רומנטית</option>
                    <option>אקשן</option>
                </select>

                <label >הגבלת גיל*</label>
                <select required id="ageRestriction" name="ageRestriction">
                    <option>הותר לכל הגילאים</option>
                    <option>הותר מגיל 12</option>
                    <option>הותר מגיל 14</option>
                    <option>הותר מגיל 16 בהצגת תעודה מזהה</option>
                </select>

                <label >אורך הסרט בדקות*</label>
                <input type="number" required id="movieLength" name="movieLength" />

                <label >תאריך הקרנת בכורה*</label>
                <input type="date" required id="premiereDate" name="premiereDate" />

                <label >לינק לטריילר*</label>
                <input type="text" required id="trailerLink" name="trailerLink" />

                <label>תקציר הסרט*</label>
                <textarea required maxLength="400" id="description" name="description" placeholder="תקציר הסרט" />

                <input type="file" name="file" ref={fileRef} accept="image/*" onChange={(e) => setImg(e.target.value)}></input>
                {img &&
                    <img
                        src={URL.createObjectURL(fileRef.current.files[0])}
                        alt="chosen-file">
                    </img>
                }

                <button >שלח</button>

            </form>
            <div>
                
            </div>
        </div>
    )
}

export default AddMoviePage
