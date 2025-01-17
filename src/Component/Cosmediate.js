import React, { useState, useEffect } from "react";
import { LuBellDot } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { MdForwardToInbox } from "react-icons/md";
import { GrFormSchedule } from "react-icons/gr";
import { MdOutlineReviews } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { IoMdAdd } from "react-icons/io";

export default function Cosmediate () {
  const [activeMenu, setActiveMenu] = useState("Treatments");
  const [activeCategory, setActiveCategory] = useState("Skin improvement");
  const [treatments, setTreatments] = useState(() => {
    const savedData = localStorage.getItem("treatments");
    return savedData ? JSON.parse(savedData) : {
      Injectables: [],
      "Skin improvement": [
        "Chemical Peels",
        "Microdermabrasion",
        "Laser Treatments",
        "Light Therapies",
      ],
      "Hair removal": [],
      "Soft surgery": [],
      "Plastic surgery": [],
    };
  });
  const [newSubCategory, setNewSubCategory] = useState("");

 
  useEffect(() => {
    const savedData = localStorage.getItem("treatments");
    if (savedData) setTreatments(JSON.parse(savedData));
  }, []);

  useEffect(() => {
    localStorage.setItem("treatments", JSON.stringify(treatments));
  }, [treatments]);

  const handleAddSubCategory = () => {
    if (
      newSubCategory.trim() &&
      !treatments[activeCategory].includes(newSubCategory)
    ) {
      const updatedTreatments = {
        ...treatments,
        [activeCategory]: [...treatments[activeCategory], newSubCategory],
      };
      setTreatments(updatedTreatments); 
      setNewSubCategory(""); 
    }
  };
  const handleRemoveSubCategory = (index) => {
    const updatedTreatments = {
      ...treatments,
      [activeCategory]: treatments[activeCategory].filter(
        (_, i) => i !== index
      ),
    };
    setTreatments(updatedTreatments);
  };
  const handlealert = () => {
    alert("Click Save to add");
  };

  return (
    <div className="app-container">
      <div className="mb-3 mt-3">
        <div className="row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="col-md-4 col-sm-12" style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
            <h3 style={{ fontWeight: "bold", marginLeft: "1rem", marginTop: "0.5rem" }}>Cosmediate</h3>
          </div>
          <div  className="col-md-4 col-sm-12" style={{ justifyContent: "center", alignItems: "center" }}>
            <div className="search-container" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <input type="text" className="form-control search-input" placeholder="Search" />
            </div>
          </div>
          <div className="col-md-4 col-sm-12" style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
            <LuBellDot style={{ color: "skyblue", marginRight: "1rem", fontSize: "1.5rem" }} />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s" alt="user" style={{ height: "2rem", width: "2rem", borderRadius: "2rem" }}/>
            <span style={{ marginLeft: "1rem", fontSize: "0.8rem", color: "grey" }}>
            <span>Tim Bouwman</span>
             <br />
            <span>Aêstec Amsterdam</span>
            </span>
            <div className="btn-group">
              <button type="button" className="btn  dropdown-toggle" style={{ color: "grey" }} aria-expanded="false"></button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-container">

        <div className="sidebar">
          <ul className="menu_list">
            <li>
              <RxDashboard className="icons" />
              <p className="menu">DASHBOARD</p>
            </li>
            <li>
              <MdForwardToInbox className="icons" />
              <p className="menu">INBOX</p>
            </li>
            <li>
              <GrFormSchedule className="icons" />
              <p className="menu">SCHEDULE</p>
            </li>
            <li>
              <MdOutlineReviews className="icons" />
              <p className="menu">REVIEWS</p>
            </li>
            <li>
              <CiSettings className="icons" style={{  color: '#7371fc'}}/>
              <p className="menu">SETTINGS</p>
            </li>
          </ul>
        </div>

        {/* Sidebar 2 */}
    <div className="sidebar2">
      <div style={{ marginLeft: "2rem" }}>
      <div className="sett">Settings</div>
      <ul>
      <div className="sidebar-back">
        <li className={`sidebar-item ${activeMenu === "General" ? "active" : ""}`} onClick={() => setActiveMenu("General")}>General</li>
        <li className={`sidebar-item ${activeMenu === "Password" ? "active" : ""}`} onClick={() => setActiveMenu("Password")}>Password</li>
        <li className={`sidebar-item ${activeMenu === "Price" ? "active" : ""}`} onClick={() => setActiveMenu("Price")}>Price</li>
        <li className={`sidebar-item ${activeMenu === "Treatments" ? "active" : ""}`} onClick={() => setActiveMenu("Treatments")}>Treatments</li>
      </div>
      </ul>
      </div>
      </div>

        {activeMenu === "Treatments" && (
          <div className="treatments-container">
            <h2 className="title">Treatments</h2>
            <div className="categories">
              {Object.keys(treatments).map((category) => (
                <button
                  key={category}
                  className={`category-button ${
                    category === activeCategory ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="main-content">
          <div className="main1">
          <div className="treatment-list" style={{marginLeft: "1rem" , marginRight: "2rem" }}>
            <h5 className="category-title">
              {activeCategory} ({treatments[activeCategory].length})
            </h5>
            <div className="treat">Treatments</div>
            <table className="table mt-2" >
              <tbody>
                {treatments[activeCategory].map((subCategory, index) => (
                  <tr key={index}>
                    <td style={{width:'95%'}}>{subCategory}</td>
                    <td style={{width:'5%'}}>
                      <button
                        className="btn-remove"
                        onClick={() => handleRemoveSubCategory(index)}
                      ><RxCross2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="add-subcategory">
            <input  type="text" className="input-field" placeholder="Select Treatment..." value={newSubCategory}
              onChange={(e) => setNewSubCategory(e.target.value)}/>
            <button  className="btn-plus" style={{border:'none'}} onClick={handlealert}>
            <IoMdAdd />
            </button>
          </div>

          <div className="actions" style={{marginTop:'1rem'}}>
            <button className="btn-cancel">Cancel</button>
            <button className="btn-save" onClick={handleAddSubCategory}>
              Save
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

