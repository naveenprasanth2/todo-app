import FirstComponent, { FifthComponent } from './FirstComponent';
import SecondComponent from './SecondComponent';
import ThirdComponent from './ThirdComponent';
import FourthComponent from './FourthComponent';
import LearningJavascript from './LearningJavascript';

export default function LearningComponent() {
  return (
    <div className="App">
      My Todo Application
      <FirstComponent/>
      <SecondComponent/>
      <ThirdComponent/>
      <FourthComponent/>
      <FifthComponent/>
      <LearningJavascript/>
    </div>
  );
}