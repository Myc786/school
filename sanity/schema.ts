import admission from './schemas/admission'
import attendance from './schemas/attendance'
import student from './schemas/student'
import staff from './schemas/staff'
import slider from './schemas/slider'

export const schema = {
  types: [admission, attendance, student, staff, slider],
}
