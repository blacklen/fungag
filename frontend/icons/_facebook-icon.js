import SvgIcon from '@material-ui/core/SvgIcon'

const FacebookIcon = (props) => (
  <SvgIcon className={props.className} viewBox={"0 0 24 24"} style={{ width: `${props.w}px`, height: `${props.h}px` }}>
    <path d="M22.875 2.13v20.236c0 .695-.564 1.254-1.254 1.254h-5.8v-8.806h2.956l.442-3.432h-3.403V9.188c0-.995.275-1.67 1.702-1.67h1.817V4.444a24.443 24.443 0 0 0-2.65-.137c-2.62 0-4.418 1.6-4.418 4.54v2.534H9.3v3.432h2.966v8.811H1.379c-.69 0-1.254-.564-1.254-1.254V2.129c0-.69.564-1.254 1.254-1.254h20.237c.695 0 1.259.564 1.259 1.254z" />
  </SvgIcon>
)

export default FacebookIcon