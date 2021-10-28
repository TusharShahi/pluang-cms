import { useStateValue } from '../../../utils/redux';


const ProfileComponent = (): JSX.Element  => {
  const [storeState, dispatch] = useStateValue();



  return (
        <>Welcome To Profile</>
    )
}

export default ProfileComponent
