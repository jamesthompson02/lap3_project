import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Btn from '../Btn';
import './style.css';

const QuizSettings = ({display, handleClick1}) => {

    const roomId = useRef();
    const category = useRef();
    const numberOfQuestions = useRef();
    const difficulty = useRef();
    const questionType = useRef();

    const navigator1 = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        const formData = {
            roomid: roomId.current.value,
            settings: {
                numberOfQuestions: numberOfQuestions.current.value,
                category: category.current.value,
                difficulty: difficulty.current.value,
                questionType: questionType.current.value
            }
        }

        if (!roomId.current.value) {
            alert("Please ensure a room id is created");
        } else if(roomId.current.value.split(' ').length > 1) {
            alert("Please ensure the room id is only one word.")

        }else {

            const postFormData = async () => {
                try {
                    const response = await axios.post('http://localhost:5002/rooms/create',
                    {...formData});
                    setTimeout(() => {
                        navigator1(`../rooms/${roomId.current.value}`, { replace: true});
                    }, 750);
                    
                } catch (e) {
                    alert(`${e.response.data}`);
                }
                
            }

            postFormData();

        }
        
        
     
    }


    return (
        <>
            <form style={{display: display}} className="formStyling">
                <h2>Set Up A New Quiz!</h2>
                <div className="input-container">
                    <label className='form-label' htmlFor='room-id'>Room id:</label>
                    <input ref={roomId} id="room-id" type="text" maxLength={20}/>
                </div>
                <div className="input-container">
                    <label className="form-label" htmlFor='category'>Category:</label>
                    <select ref={category} id="category">
                        <option value="9">General Knowledge</option>
                        <option value="10">Entertainment - Books</option>
                        <option value="11">Entertainment - Film</option>
                        <option value="12">Entertainment - Music</option>
                        <option value="13">Entertainment - Musicals & Theatres</option>
                        <option value="14">Entertainment - Television</option>
                        <option value="15">Entertainment - Video Games</option>
                        <option value="16">Entertainment - Board Games</option>
                        <option value="17">Science & Nature</option>
                        <option value="18">Science - Computers</option>
                        <option value="19">Science - Mathematics</option>
                        <option value="20">Mythology</option>
                        <option value="21">Sports</option>
                        <option value="22">Geography</option>
                        <option value="23">History</option>
                        <option value="24">Politics</option>
                        <option value="25">Art</option>
                        <option value="26">Celebrities</option>
                        <option value="27">Animals</option>
                        <option value="28">Vehicles</option>
                        <option value="29">Entertainment - Comics</option>
                        <option value="30">Science - Gadgets</option>
                        <option value="31">Entertainment - Japanese Manga & Anime</option>
                        <option value="32">Entertainment - Cartoon & Animations</option>
                    </select>
                </div>
                <div className="input-container">
                    <label className="form-label" htmlFor='number-of-questions'>Number of Questions:</label>
                    <select ref={numberOfQuestions} id="number-of-questions">
                        <option value="2">2</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        {/* <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option> */}
                    </select>
                </div>
                <div className="input-container">
                    <label className="form-label" htmlFor='difficulty'>Difficulty:</label>
                    <select ref={difficulty} id="difficulty">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="input-container">
                    <label className="form-label" htmlFor='question-type'>Question Type:</label>
                    <select ref={questionType} id="question-type">
                        <option value="multiple">Multiple</option>
                        <option value="boolean">True/False</option>
                    </select>
                </div>

                <div style={{display: "flex", justifyContent: "space-between", minWidth: "200px"}}>
                    <Btn text="Go Back" handleClick={handleClick1} />
                    <button type="submit" onClick={submitForm}>Submit</button>
                </div>
                
                


            </form>
        
        
        </>
    );
}

export default QuizSettings;
