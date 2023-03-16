import { zxcvbnAsync, zxcvbnOptions} from '@zxcvbn-ts/core'
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import matcherPwnedFactory from "@zxcvbn-ts/matcher-pwned";

const calculatePasswordStrength = async (password: string) => {

  const options = {
    translations: zxcvbnEnPackage.translations,
    graphs: zxcvbnCommonPackage.adjacencyGraphs,
    dictionary: {
      ...zxcvbnCommonPackage.dictionary,
      ...zxcvbnEnPackage.dictionary,
    },
  }
  const matcherPwned = matcherPwnedFactory(fetch, zxcvbnOptions);
  zxcvbnOptions.addMatcher("pwned", matcherPwned);
  zxcvbnOptions.setOptions(options)
  return await zxcvbnAsync(password);

}

export default calculatePasswordStrength;