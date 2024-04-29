"use client";
import styles from "./style.module.scss";
import HomePage from "@/component/homepage/page";

import LayoutWithSidebar from "@/component/LayoutWithSidebar/page";
export default function Home() {
  return (
    <LayoutWithSidebar>
        <HomePage />
    </LayoutWithSidebar>
  );
}
