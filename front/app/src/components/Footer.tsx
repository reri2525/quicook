import { Fragment } from 'react'
import '../ScssFile/Footer.scss'
function Footer(props: any) {
   const ShowLogModal = () => {
    props.setLogModal(true)
   }
   const ShowNewModal = () => {
    props.setNewModal(true)
   }
  return (
    <Fragment>
      <footer>
        <h2>Quicook..</h2>
        <h3>３分で作れるお手軽料理レシピが動画付きで見れる!</h3>
        <a className='new' onClick={() => ShowNewModal()}>新規登録</a>
        <a className='login' onClick={() => ShowLogModal()}>ログイン</a>
        <img className='footer_photo' src='http://illust-ryokka.jp/wp-content/uploads/2017/12/Cuisine-16.png'></img>
      </footer>
    </Fragment>
  );
}

export default Footer;