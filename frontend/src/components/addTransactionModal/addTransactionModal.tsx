import { Backdrop, Box, Button, Fade, FormControl, InputLabel, ListSubheader, MenuItem, Modal, Select, SxProps, TextField, Theme, Typography } from "@mui/material";
import React from "react";
import './addTransactionModal.css';

type TProps = {
    title: string
    isOpen: boolean,
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

export const AddTransactionModal:React.FC<TProps> = (props) => {
    return <div className="add-transaction-modal-container">
        <Modal
            open={props.isOpen}            
            closeAfterTransition
            onClose={() => props.closeModal()}
        >
        <Fade in={props.isOpen}>
            <Box sx={style}>
                <div className="add-transaction-modal-content-container">
                    <div className="add-transaction-modal-content-header">
                        <span className="add-transaction-modal-content-header-title">{props.title}</span>
                        <button className="add-transaction-modal-content-header-close-button" onClick={() => props.closeModal()}></button>
                    </div>
                    <div className="add-transaction-modal-content-inputs">
                        <TextField 
                            label={'Введите сумму'}
                            fullWidth
                            required
                        />
                        <FormControl fullWidth>
                            <InputLabel id="category-select">Категория</InputLabel>
                            <Select
                                labelId="category-select"
                                label='Категория'
                                fullWidth
                            >
                                <MenuItem value={'products'}>Продукты</MenuItem>
                                <MenuItem value={'products'}>Одежда</MenuItem>
                                <MenuItem value={'products'}>Автомобиль</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="subcategory-select">Подкатегория</InputLabel>
                            <Select
                                labelId="subcategory-select"
                                label='Подкатегория'
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <ListSubheader>Продукты</ListSubheader>
                                <MenuItem value={'products'}>Пельмени</MenuItem>
                                <MenuItem value={'products'}>Макароны</MenuItem>
                                <ListSubheader>Одежда</ListSubheader>
                                <MenuItem value={3}>Футболки</MenuItem>
                                <MenuItem value={4}>Кросовки</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Button
                        variant="contained"
                        // fullWidth
                        size="large"
                    >
                        Добавить
                    </Button>
                </div>
            </Box>
        </Fade>
        </Modal>
    </div>
}