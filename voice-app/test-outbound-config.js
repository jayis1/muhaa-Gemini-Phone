const deviceRegistry = require('./lib/device-registry');

console.log("Testing Outbound Configuration Lookup...");

// Simulating the logic in outbound-routes.js
const testCases = [
    { deviceParam: '9000', expectedName: 'Morpheus', expectedSkip: undefined },
    { deviceParam: 'Morpheus', expectedName: 'Morpheus', expectedSkip: undefined },
    { deviceParam: '9001', expectedName: 'TheOne', expectedSkip: true },
    { deviceParam: 'TheOne', expectedName: 'TheOne', expectedSkip: true },
    { deviceParam: '9002', expectedName: 'Trinity', expectedSkip: undefined },
];

let failed = false;

testCases.forEach(test => {
    const config = deviceRegistry.get(test.deviceParam);
    if (!config) {
        console.error(`FAIL: Device '${test.deviceParam}' not found`);
        failed = true;
        return;
    }

    if (config.name !== test.expectedName) {
        console.error(`FAIL: Device '${test.deviceParam}' returned name '${config.name}', expected '${test.expectedName}'`);
        failed = true;
    }

    if (config.skipThinking !== test.expectedSkip) {
        console.error(`FAIL: Device '${test.deviceParam}' returned skipThinking '${config.skipThinking}', expected '${test.expectedSkip}'`);
        failed = true;
    } else {
        console.log(`PASS: Device '${test.deviceParam}' -> ${config.name} (skipThinking: ${config.skipThinking})`);
    }
});

if (failed) {
    console.error("Some tests failed.");
    process.exit(1);
} else {
    console.log("All configuration tests passed.");
}
