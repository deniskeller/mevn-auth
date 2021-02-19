export default function ({
  store,
  redirect
}) {
  if (!store.$auth.$state.auth) {
    return redirect('/login');
  }
}
