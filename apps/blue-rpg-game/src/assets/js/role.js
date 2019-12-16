import $axios from '$axios';

export function role() {
  if(sessionStorage.getItem('secret-key'))
  $axios.get(``, {
    params: {
      [`secretKey`]:
    }
  })
}