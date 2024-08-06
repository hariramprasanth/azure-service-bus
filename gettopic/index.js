const { ServiceBusClient } = require("@azure/service-bus");

// Replace with your connection string, topic name, and subscription name
const connectionString =
	"Endpoint=sb://servicebus435.servicebus.windows.net/;SharedAccessKeyName=gettopic1saspolicy;SharedAccessKey=L798AxQF2vpZNz+S9nNO4f3sM8a3y6D0u+ASbKT9F9U=;EntityPath=topic1";
const topicName = "topic1";
const subscriptionName = "sub1";

async function receiveMessages() {
	const sbClient = new ServiceBusClient(connectionString);
	const receiver = sbClient.createReceiver(topicName, subscriptionName);

	try {
		// Receive a batch of messages
		const messages = await receiver.receiveMessages(10, { maxWaitTimeInMs: 5000 });

		for (const message of messages) {
			console.log(`Received message: ${message.body}`);
			// Complete the message to remove it from the queue
			await receiver.completeMessage(message);
		}

		if (messages.length === 0) {
			console.log("No messages received.");
		}
	} finally {
		await receiver.close();
		await sbClient.close();
	}
}

receiveMessages().catch((err) => {
	console.error("Error receiving messages: ", err);
});
