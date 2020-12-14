App.js - line 35
consider `if(!var)` instead of `if (var === null ) {}`,
shorter and complies with convention. `var` would only evaluate to `false` on `null, undefined, '', 0, NaN & false`

components/

admin/AdminTabs.js - line 15
maybe desctructure `useState` on React import for consistency?

                    - line 17 - 19

I'm sorry but can you clarify this `handleChange` function please? Does it take a second argument as a final value which you then set with the hook?

user/ProfileInformation.js - lines 16-19
typo: got `String 'null' instead of null`

Account.js - line 22
`!== null` can be omitted from and should still work as expected `state.currentUser !== null && state.currentUser.role === 'admin'`

navigation/Modal.js - line 23
maybe desctructure `useState` on React import for consistency?
