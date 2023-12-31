"use client";
import "@/styles/app.css";
import "@/styles/Category.css";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import "@/styles/Account.css";
import DeleteButtonNormal from "@/app/components/Button/DeleteButtonNormal";
export default function CategoryList(props) {
  const token = props.token;
  const ApiLink = "http://localhost:8000/api/category/getall";
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ApiLink, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategoryList(response.data.categories);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [token, categoryList]);
  const [showAddCategory, setShowCategory] = useState(false);
  const handleShowCate = () => {
    setShowCategory(true);
  };
  return (
    <div className="flex">
      <div className="wrapper">
        <div className="CategoryListSection">
          <div className="CategoryListSection_title">Danh Sách Danh Mục</div>
          <button
            className="btn btnAddCategory border-black border-1 hover:bg-slate-600 "
            onClick={() => handleShowCate()}
          >
            Thêm Danh Mục
          </button>

          <select className="CategoryList_Items">
            <option value="">Chọn một danh mục</option>
            {categoryList.map((category) => (
              <option key={category._id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
          <div className="w-full">
            {Array.isArray(categoryList) && categoryList.length > 0 ? (
              <table id="Accounts" className="AccountList_Table">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>AdminName</th>
                    <th>Mô Tả</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryList.slice(0, 10).map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.categoryName}</td>
                      <td>{item.description}</td>
                      <td>{item.status}</td>
                      <td className="flex gap-2 justify-center items-center">
                        <DeleteButtonNormal
                          id={item._id}
                          token={token}
                          ApiLink={`http://localhost:8000/api/category/delete/${item._id}`}
                        ></DeleteButtonNormal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>Không có dữ liệu</div>
            )}
          </div>
        </div>
      </div>
      {showAddCategory == true ? (
        <div>
          <AddCategory token={token} />
        </div>
      ) : null}
    </div>
  );
}
