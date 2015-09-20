import twitter
import indicoio
from indicoio import political, sentiment, language, text_tags, keywords, fer, facial_features, image_features


api = twitter.Api(consumer_key='...',
                      consumer_secret='...',
                      access_token_key='...',
                      access_token_secret='...')

indicoio.config.api_key = "ac9e3e9c5e603a59d6752fad66fdeb51"
politicianTwitters = ['LincolnChafee', 'HillaryClinton', 'lessig', 'MartinOMalley', 'BernieSanders', 'JimWebbUSA', 'JebBush', 'RealBenCarson', 'ChrisChristie', 'tedcruz', 'CarlyFiorina', 'gov_gilmore', 'GrahamBlog', 'GovMikeHuckabee', 'BobbyJindal', 'JohnKasich', 'GovernorPataki', 'RandPaul', 'marcorubio', 'RickSantorum', 'ScottWalker', 'realDonaldTrump']
output = open('politicianScores.txt', 'w')
libertarian = 'Libertarian'
green = 'Green'
liberal = 'Liberal'
conservative = 'Conservative'
for user in politicianTwitters:
    statuses = api.GetUserTimeline(screen_name=user, count=200)
    l = [s.text for s in statuses]
    count = len(l)
    scores = {libertarian: 0, green: 0, liberal: 0, conservative: 0}
    for entry in l:
        politicianScore = political(entry)
        scores[libertarian] += politicianScore[u'Libertarian']
        scores[green] += politicianScore[u'Green']
        scores[liberal] += politicianScore[u'Liberal']
        scores[conservative] += politicianScore[u'Conservative']
    scores[libertarian] /= count
    scores[green] /= count
    scores[liberal] /= count
    scores[conservative] /= count
output.write(user + " " + libertarian + ": " + str(scores[libertarian]) + green + ": " + str(scores[green]) + liberal + ": " + str(scores[liberal]) + conservative + ": " + str(scores[conservative]) + '\n')
