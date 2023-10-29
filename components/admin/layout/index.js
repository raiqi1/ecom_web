import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { hideDialog } from "../../../store/DialogSlice";
import DialogModal from "../../dialogModal";

export default function Layout({ children }) {

    const {expandSidebar} = useSelector((state) => ({...state}));
    const showSidebar = expandSidebar.expandSidebar;
    const dispatch = useDispatch()
    console.log("showSidebar",showSidebar);

    useEffect(() => {
      dispatch(hideDialog())
    },[])
  
  return (
    <div className={styles.layout}>
     <DialogModal />
      <Sidebar />
      <div
      style={{marginLeft:`${showSidebar ? "280px" : "80px"}`}}
       className={styles.layout__main}>{children}</div>
    </div>
  );
}
