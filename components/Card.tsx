import React from "react";
import { Container } from "@material-ui/core";
import styles from "../styles/Card.module.css";

interface AuxProps {
    children: React.ReactChild | React.ReactChildren | React.ReactChild[] | React.ReactChildren[];
  }
  

export default function Card({ children }: AuxProps) {
    return (
        <>
            <Container style={{ flexDirection: 'column' }} className={styles.card_div}>{children}</Container>
        </>
    );
}
