import load from "./load"

export default locale => {
	const _ = name => `${locale}_${name}`
	return [
		{ name: _("Homepage"), path: "", component: load("homepage") },
		{ name: _("Privacy"), path: "privacy_policy" }
	]
}