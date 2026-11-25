// Proposed diagnostic classification; not used by the product or build.
// Apply only after native component evidence and contract review; not a fix for identity.
export function transform(source) {
  const edits=[
    ['if(candidates.length!==1||mapping.has(candidates[0].id))return {code:"NATIVE_ROW_IDENTITY_UNVERIFIED"};',
     'if(candidates.length===0)return {code:"NATIVE_ROW_IDENTITY_UNVERIFIED_NO_MATCH"};\n      if(candidates.length!==1)return {code:"NATIVE_ROW_IDENTITY_UNVERIFIED_AMBIGUOUS"};\n      if(mapping.has(candidates[0].id))return {code:"NATIVE_ROW_IDENTITY_UNVERIFIED_DUPLICATE"};'],
    ['if(!row)throw Error("NATIVE_ROW_IDENTITY_UNVERIFIED");',
     'if(!row)throw Error("NATIVE_ROW_IDENTITY_UNVERIFIED_TARGET_MISSING");'],
    ['if(!again.mapping||again.mapping.get(id)!==row)throw Error("NATIVE_ROW_IDENTITY_UNVERIFIED");',
     'if(!again.mapping)throw Error("NATIVE_ROW_IDENTITY_UNVERIFIED_REVALIDATION");\n    if(again.mapping.get(id)!==row)throw Error("NATIVE_ROW_IDENTITY_UNVERIFIED_ROW_CHANGED");']
  ];
  for(const [before,after] of edits){
    if(source.split(before).length!==2)throw Error('Expected unique 0.1.4 anchor: '+before);
    source=source.replace(before,after);
  }
  return source;
}
