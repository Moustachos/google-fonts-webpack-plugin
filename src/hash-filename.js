const getHashDigest = require("loader-utils/lib/getHashDigest");

function hashFileName(fileName, source, options = {}) {
    const hash = typeof options.hash !== 'undefined' ? options.hash : '[contenthash:8]'
    const parts = fileName.split('.')

    // append hash to filename
    if (typeof hash === 'string' && hash.length) {
        parts.splice(-1, 0, hash)
    }

    // interpolate template strings
    // taken from loader-utils package
    return parts.join('.').replace(
        /\[(?:([^:\]]+):)?(?:hash|contenthash)(?::([a-z]+\d*))?(?::(\d+))?\]/gi,
        (all, hashType, digestType, maxLength) =>
            getHashDigest(source.source(), hashType, digestType, parseInt(maxLength, 10))
    )
}

module.exports = hashFileName
