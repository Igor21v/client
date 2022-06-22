import React from 'react';
import icon_download from '../../../assets/img/download.svg';
import icon_basket from '../../../assets/img/basket.svg';
import './file.css'
import { useDispatch } from 'react-redux';
import { downloadUserFile } from '../../../actions/file';
import sizeFormat from '../../sizeFormat';
/* import { deleteUserFile } from '../../../../../../../actions/user'; */

const File = ({ props }) => {
    const dispatch = useDispatch()
    const delUserFile = e => {
       /*  e.stopPropagation() */
        console.log('удалить файл')
        /* dispatch(deleteUserFile(props.userId, props.file)) */
    }

    const getUserFile = () => {
        downloadUserFile(props.userId, props.folder, props.file)
    }
    console.log(props)
    const dateTime = props.file.time.slice(0, 19)

    return (
        <div className='file' >
            <img className="file__img" src={icon_download} alt="" onClick={getUserFile}/>
            <div className="file__name">{props.file.name}</div>
            <img className='file__basket'  src={icon_basket} alt="" onClick={delUserFile} />
            <div className="file__date">{dateTime.replace('T', ' ')}</div>
            <div className="file__size">{sizeFormat(props.file.size)}</div>
        </div>
    );
};

export default File;