// 고객 추가
import React, { useState,useRef } from "react";
import axios from "axios";
import "../App.css";

function CustomerAdd({addCustomerToList, fetchCustomers}) {
    const [file, setFile] = useState(null);
    const [userName, setUserName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [job, setJob] = useState("");
    const [fileName, setFileName] = useState("");
    const [imageUrl, setImageUrl] = useState("");  // 이미지 URL을 저장하는 상태
    const fileInputRef = useRef(null); // file input에 대한 ref 설정
 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addCustomer();
            console.log(response.data);

            // 이미지 URL 갱신
            setImageUrl(`http://localhost:5000/uploads/${response.data.image}`);

            // 새 고객 추가 후 부모 컴포넌트에 데이터 전달
            addCustomerToList(response.data);

            // 데이터 추가 완료 메시지 표시
            alert("서버에 데이터 추가 완료!");

            // 입력 필드 초기화
            setUserName("");
            setBirthday("");
            setGender("");
            setJob("");
            setFile(null);
            setFileName("");
            setImageUrl("");
            
            // 파일 입력 필드 리셋
            fileInputRef.current.value = "";  // file input 필드를 리셋합니다.

            // 새로고침 없이 고객 목록을 갱신
            fetchCustomers();
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setFileName(file.name); 
    };

    const handleValueChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const addCustomer = () => {
        const url = "/api/customers"; 
        const formData = new FormData();
        formData.append("image", file); 
        formData.append("name", userName);
        formData.append("birthday", birthday);
        formData.append("gender", gender);
        formData.append("job", job);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        return axios.post(url, formData, config);
    };


    return (
      <form onSubmit={handleFormSubmit} className="space-y-4 p-6 mt-4 max-w-2xl mx-auto bg-white rounded-lg shadow-md w-1/2">
      <h1 className="text-2xl font-semibold text-center text-gray-800">고객 추가</h1>

      <div>
          <label className="block text-sm font-medium text-gray-700">프로필 이미지:</label>
          <input
              ref={fileInputRef}
              type="file"
              name="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700">이름:</label>
          <input
              type="text"
              name="userName"
              value={userName}
              onChange={handleValueChange(setUserName)}
              className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700">생년월일:</label>
          <input
              type="text"
              name="birthday"
              value={birthday}
              onChange={handleValueChange(setBirthday)}
              className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700">성별:</label>
          <input
              type="text"
              name="gender"
              value={gender}
              onChange={handleValueChange(setGender)}
              className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700">직업:</label>
          <input
              type="text"
              name="job"
              value={job}
              onChange={handleValueChange(setJob)}
              className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
      </div>

      <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
          추가하기
      </button>

      {/* 이미지가 설정되면 해당 이미지를 보여줍니다 */}
      {imageUrl && (
          <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-700">프로필 이미지:</h2>
              <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-full"
              />
          </div>
      )}
  </form>

    );
}

export default CustomerAdd;
