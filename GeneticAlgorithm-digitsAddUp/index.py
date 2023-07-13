import random
from pyecharts.charts import Line
from pyecharts import options as opts

# 个体数量
INDIVIDUAL_AMOUNT = 100

# 个体的基因数量
GENE_AMOUNT = 100

# 单个基因突变机率
GENETIC_LOTTERY_CHANCE = 0.001

# 交叉变异的机率
CROSS_VARIATION_CHANCE = 0.1

# 迭代次数
ITERATION_AMOUNT = 100

# 获取个体群 
def getIndividuals() :
	individuals = []
	for index in range(INDIVIDUAL_AMOUNT):
		individual = []
		for index in range(GENE_AMOUNT):
			individual.append(random.randint(0, 1))
		individuals.append(individual)
	return individuals


# 获取个体适应度
def getIndividualFitness(individual) :
	return sum(individual)


# 选择下一代个体
def getNextGenerationIndividuals(individuals):
	# 根据适应度获取扩充个体
	nextExtendIndividuals = []
	for individual in individuals:
		fitness = getIndividualFitness(individual)
		for index in range((fitness * fitness) // 10):
			nextExtendIndividuals.append(individual[:])
	# 压缩个数数量
	extendIndividuals = []
	nextExtendIndividualsAmount = len(nextExtendIndividuals)
	for index in range(INDIVIDUAL_AMOUNT):
		extendIndividuals.append(nextExtendIndividuals[random.randint(0, nextExtendIndividualsAmount - 1)]) #randint和数组长度可以有bug
	return extendIndividuals

# 对个体进行变异
def individualGeneLottery(individual):
	for index in range(GENE_AMOUNT):
		if random.random() < GENETIC_LOTTERY_CHANCE:
			individual[index] = 1 if individual[index] == 0 else 0

# 交叉变异
def individualCrossVariation(individual1, individual2):
	crossIndex1 = random.randint(0, GENE_AMOUNT)
	# crossIndex2 = random.randint(0, GENE_AMOUNT)
	for index in range(0, crossIndex1):
		individual1[index], individual2[index] = individual2[index], individual1[index]

# 对群落进行变异
def individualsVariation(individuals):
	for individual in individuals:
		individualGeneLottery(individual)
		if(random.random() < CROSS_VARIATION_CHANCE):
			crossIndividual = individuals[random.randint(0,INDIVIDUAL_AMOUNT - 1)]
			individualCrossVariation(individual, crossIndividual)

# 绘制折线图
def createLineEchart(avgFitnessArr, maxFitnessArr):
	line=Line()
	line.set_global_opts(
        xaxis_opts = opts.AxisOpts(
            is_show = False,    #隐藏X轴刻度
        ),
        yaxis_opts = opts.AxisOpts(
            is_show = False,    #隐藏Y轴刻度
        ),
        legend_opts = opts.LegendOpts(is_show = False),  #隐藏图例
        title_opts = opts.TitleOpts(title = None),    #隐藏标题
	)
	line.add_xaxis(range(1, ITERATION_AMOUNT))
	line.add_yaxis('平均适应度', avgFitnessArr, label_opts = opts.LabelOpts(is_show=False))
	line.add_yaxis('最高适应度',maxFitnessArr)
	line.set_global_opts(title_opts = opts.TitleOpts(title="OneMax"))
	line.render('./index.html')

# 程序入口
if __name__ =='__main__':
	individuals = getIndividuals()
	avgFitnessArr = []
	maxFitnessArr = []
	for index in range(ITERATION_AMOUNT):
		individuals = getNextGenerationIndividuals(individuals)
		individualsVariation(individuals)
		allFitness = 0
		maxFitness = 0
		for individual in individuals:
			fitness = getIndividualFitness(individual)
			allFitness += fitness
			maxFitness = maxFitness if maxFitness > fitness else fitness
		avgFitnessArr.append(allFitness / INDIVIDUAL_AMOUNT)
		maxFitnessArr.append(maxFitness)
	createLineEchart(avgFitnessArr, maxFitnessArr)