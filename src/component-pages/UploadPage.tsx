import SingleFileUploader from '../components/SingleFileUploader'
import ClearDB from '../components/ClearDB'
import UploadedList from '../components/UploadedList'

export default function UploadPage(){
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <SingleFileUploader />
      <ClearDB />
      <UploadedList />
    </div>
  );
};