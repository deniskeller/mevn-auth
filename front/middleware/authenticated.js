export default function ({
  store,
  redirect
}) {
  // console.log('fuf');
  // console.log(store);
  if (!store.$auth.$state.auth) {
    // return redirect('/landing-modal/hello');
    return redirect('/registration');
  }
}
