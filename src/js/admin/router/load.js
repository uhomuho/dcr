export default name => {
	return () => import(/* webpackChunkName: [name] */`@tpl/${name}.vue`)
}