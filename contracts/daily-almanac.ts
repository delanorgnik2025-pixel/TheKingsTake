import {SPIRIT_LIBRARY} from './spirit-library';
const SIGNS=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'] as const;
const THEMES=[
 ['Begin with one honest conversation.','Choose one task you can finish before chasing the next spark.'],
 ['Protect the time you promised yourself.','Make room for a small change in a familiar routine.'],
 ['Listen for the question beneath the words.','Turn one interesting idea into a clear sentence.'],
 ['Let care include your own boundaries.','Name what makes a space feel like home.'],
 ['Give someone else room to shine.','Let the work speak before reaching for applause.'],
 ['Improve one detail without demanding perfection.','Leave enough space in the plan to learn something.'],
 ['A fair exchange begins with a clear request.','Choose balance through an action, not an appearance.'],
 ['Keep curiosity stronger than suspicion.','Ask for evidence before assigning a hidden motive.'],
 ['Explore a different perspective without losing your footing.','Let a good question lead the next conversation.'],
 ['Build a step you can repeat tomorrow.','Measure progress against your own commitments.'],
 ['Share an idea and welcome a thoughtful challenge.','Notice who gets left outside a group conversation.'],
 ['Give imagination a practical place to land.','Write down what you feel before deciding what it means.'],
] as const;
export function dailyAlmanac(day:string){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(day)||!Number.isFinite(Date.parse(day+'T12:00:00Z')))throw new Error('Invalid day');
 const index=Math.floor(Date.parse(day+'T12:00:00Z')/86400000);
 const entry=SPIRIT_LIBRARY[index%SPIRIT_LIBRARY.length];
 const signs=SIGNS.map((sign,i)=>({sign,text:`${THEMES[(i+index)%THEMES.length][index%2]} ${THEMES[i][(index+1)%2]}`}));
 return {day,entry,signs,title:`The King’s Almanac · ${day}`,body:`THE KING’S ALMANAC · ${day}\nDaily zodiac reflections · entertainment, not an astronomical forecast or a prediction of events. Original editorial prompts, not a personalized chart.\n\n${signs.map(s=>`${s.sign}: ${s.text}`).join('\n\n')}\n\nSPIRIT & SYMBOL\n${entry.title}\n${entry.intro}\nExplore the sourced reading on The King’s Take.`};
}
