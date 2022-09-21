import { Box, Button, Fade, Modal, SxProps, TextField, Theme } from "@mui/material";
import React, { useState } from "react";

type TProps = {
    isOpen: boolean
    closeModal: () => void
}

const style: SxProps<Theme> = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: 'none',
    border: "none",
    boxShadow: 24,
};

export const AddSumModal:React.FC<TProps> = (props) => {
    const [value, setValue] = useState<string>('');

    function submitForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //@ts-ignore
        console.log(e.target[0].value)
    }

    return <Modal
        open={props.isOpen}            
        closeAfterTransition            
        onClose={() => props.closeModal()}
    >
    <Fade in={props.isOpen}>
        <Box sx={style}>
            <div className="add-sum-modal-content-container">
                <div className="add-sum-modal-content-header">
                    <span className="add-sum-modal-content-header-title">Добавить накопления</span>
                    <button className="add-sum-modal-content-header-close-button" onClick={() => props.closeModal()}></button>
                </div>
                <form className="add-sum-modal-content-inputs" id="sum-form" onSubmit={e => submitForm(e)}>
                        <TextField
                            label={'Сумма'}
                            fullWidth
                            required
                            type={'number'}
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            autoComplete='off'
                        />
                </form>
                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    form='sum-form'
                    className="aaa"
                >
                    Добавить
                </Button>
            </div>
        </Box>
    </Fade>
    </Modal>
}