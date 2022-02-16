import React, { useEffect, useState } from "react";
import SimpleTabs from "../BuySection/tabs";
import { Sign } from "../../functions/requests.js"
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function BuySection(){

    return (<SimpleTabs/>)
  }