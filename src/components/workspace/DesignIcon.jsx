import schoolInactive from '../../assets/workspace/f65bf.svg';
import studentActive from '../../assets/workspace/b3df7.svg';
import arrow from '../../assets/workspace/524c8.svg';
import edit from '../../assets/workspace/6c2ae.svg';
import check from '../../assets/workspace/3410a.svg';
import location from '../../assets/workspace/f91a7.svg';
import darkArrow from '../../assets/workspace/e74b6.svg';
import school from '../../assets/workspace/b3c05.svg';
import student from '../../assets/workspace/10f2a.svg';
import back from '../../assets/workspace/65674.svg';

const icons = { arrow, edit, check, location, darkArrow, school, schoolInactive, student, studentActive, back };

export function DesignIcon({ name }) {
  return <img className="design-icon" src={icons[name]} alt="" aria-hidden="true" />;
}
