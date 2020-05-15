import SvgIcon from '@material-ui/core/SvgIcon'

const GoogleIcon = (props) => (
  <SvgIcon className={props.className} viewBox={"0 0 26 26"} style={{ width: `${props.w}px`, height: `${props.h}px` }}>
    <path d="M25.39 13.545c0 7.185-4.92 12.299-12.187 12.299A12.579 12.579 0 0 1 .61 13.25 12.579 12.579 0 0 1 13.203.656c3.392 0 6.246 1.244 8.445 3.296L18.22 7.248C13.736 2.92 5.398 6.17 5.398 13.25c0 4.393 3.509 7.952 7.805 7.952 4.987 0 6.856-3.575 7.15-5.428h-7.15v-4.332h11.99c.116.645.198 1.265.198 2.103z"/>
  </SvgIcon>
)

export default GoogleIcon